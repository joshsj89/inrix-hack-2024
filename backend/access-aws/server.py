from flask import Flask, request, jsonify
# from Token import get_token
# from CamerasBox import get_cameras_in_a_box, get_cameras_in_radius
# from CameraImage import get_camera_image
from bedrock import invoke_bedrock

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


# Example URL: localhost:3000/bedrock-req
@app.route("/bedrock-req", methods = ['POST'])
def bedrock_req():
    # print(request.data)
    # return "I got your request"
    return invoke_bedrock(request)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)