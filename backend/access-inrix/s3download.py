# run ./s3download.py

import boto3

# Replace 'your_access_key_id' and 'your_secret_access_key' with your AWS credentials
access_key_id = "AKIAUM5NMVN5QO2OUCGU"
secret_access_key = "zyybNILPf7ll93+u2cOp2Fwwhjk9m5uMne4FqlWk"

# Replace 'your_bucket_name' with the name of your S3 bucket
bucket_name = "inrix-hackathon-data"

# Create an S3 client
s3 = boto3.client(
    "s3", aws_access_key_id=access_key_id, aws_secret_access_key=secret_access_key
)

# Path of the file in S3
object_key = "Inrix-Traffic-Camera-Images/10211/2024-10-23_03-52.jpeg"

# save the file in the current directory.
local_file_path = "./myimg.jpeg"

# Download the object from S3
s3.download_file(bucket_name, object_key, local_file_path)

print(f"Object '{object_key}' downloaded to '{local_file_path}'")
