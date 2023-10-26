import requests
import cv2
import azure.ai.vision as sdk
import json

service_options = sdk.VisionServiceOptions("https://cameratest01.cognitiveservices.azure.com/","254fa3e0f58d4133a566e3f565f170cb")
image_url="https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png"
vision_source = sdk.VisionSource(
    url=image_url)

analysis_options = sdk.ImageAnalysisOptions()

analysis_options.features = (
    sdk.ImageAnalysisFeature.CAPTION |
    sdk.ImageAnalysisFeature.TEXT
)

analysis_options.language = "en"

analysis_options.gender_neutral_caption = True

image_analyzer = sdk.ImageAnalyzer(service_options, vision_source, analysis_options)

result = image_analyzer.analyze()
print(result.text,"\n\n\n\n\n")
with open("./data/image_json.json",'w') as file:
    json.dump(result.text, file)
if result.reason == sdk.ImageAnalysisResultReason.ANALYZED:

    if result.caption is not None:
        print(" Caption:")
        print("   '{}', Confidence {:.4f}".format(result.caption.content, result.caption.confidence))

    if result.text is not None:
        print(" Text:")
        for line in result.text.lines:
            points_string = "{" + ", ".join([str(int(point)) for point in line.bounding_polygon]) + "}"
            print("   Line: '{}', Bounding polygon {}".format(line.content, points_string))
            for word in line.words:
                points_string = "{" + ", ".join([str(int(point)) for point in word.bounding_polygon]) + "}"
                print("     Word: '{}', Bounding polygon {}, Confidence {:.4f}"
                      .format(word.content, points_string, word.confidence))
    # Download the image
    response = requests.get(image_url)
    if response.status_code == 200:
        image_data = response.content
        with open("output_image.jpg", "wb") as image_file:
            image_file.write(image_data)

    # # Process the analysis results and draw bounding boxes
    image = cv2.imread('your_image.jpg')

    # Define the color and thickness for the bounding boxes
    color = (0, 0, 255)  # Red color in BGR
    thickness = 2  # Line thickness

    for item in result.text:
        if "bounding_polygon" in item:
            # Extract the bounding box coordinates
            bounding_box = item["bounding_polygon"]

            # Convert the coordinates to integer values
            bounding_box = [(int(coord), int(coord_y)) for coord, coord_y in zip(bounding_box[::2], bounding_box[1::2])]

            # Draw a rectangle around the text
            for i in range(0, len(bounding_box), 2):
                start_point = bounding_box[i]
                end_point = bounding_box[i + 1]
                image = cv2.rectangle(image, start_point, end_point, color, thickness)

    # Save the image with bounding boxes
    cv2.imwrite('image_with_boxes.jpg', image)

    # Display the image (optional)
    cv2.imshow('Image with Bounding Boxes', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


else:

    error_details = sdk.ImageAnalysisErrorDetails.from_result(result)
    print(" Analysis failed.")
    print("   Error reason: {}".format(error_details.reason))
    print("   Error code: {}".format(error_details.error_code))
    print("   Error message: {}".format(error_details.message))