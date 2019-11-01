provider "aws" {
  profile = "default"
  region = "ap-southeast-2"
}

resource "aws_lambda_function" "spellcheck" {
  function_name = "spellcheckApi"

  s3_bucket = "spellcheck-api"
  s3_key = "v0.0.0-alpha/spellcheck.zip"

  handler = "src/lambda.handler"
  runtime = "nodejs10.x"
  memory_size = "128"
  environment {
    variables = {
      NODE_ENV = "production"
      DYNAMO_TABLE_NAME = "dictionary_production"
    }
  }

  role = "${aws_iam_role.lambda_exec.arn}"
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
