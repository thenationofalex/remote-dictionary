variable "lambda_function_name" {
  default = "remote-dictionary"
}

variable "region" {
  default = "ap-southeast-2"
}

variable "dynamo_table" {
  default = "dictionary_production"
}

variable "app_version" {
  default = "0.0.0-alpha"
}

provider "aws" {
  profile = "default"
  region  = "${var.region}"
}

resource "aws_lambda_function" "remote-dictionary" {
  function_name = "${var.lambda_function_name}"

  s3_bucket = "remote-dictionary-api"
  s3_key = "v${var.app_version}/remote-dictionary.zip"

  handler = "src/lambda.handler"
  runtime = "nodejs10.x"
  memory_size = "128"
  environment {
    variables = {
      NODE_ENV = "production"
      DYNAMO_TABLE_NAME = "${var.dynamo_table}"
    }
  }

  role = "${aws_iam_role.lambda_exec.arn}"

  depends_on = [
    "aws_iam_role_policy_attachment.lambda_logs",
    "aws_cloudwatch_log_group.remote-dictionary-log"
  ]
}

resource "aws_iam_role" "lambda_exec" {
  name = "${var.lambda_function_name}-lambda"

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

resource "aws_cloudwatch_log_group" "remote-dictionary-log" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 14
}

resource "aws_iam_policy" "lambda_logging" {
  name = "lambda_logging"
  path = "/"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = "${aws_iam_role.lambda_exec.name}"
  policy_arn = "${aws_iam_policy.lambda_logging.arn}"
}

 resource "aws_lambda_permission" "apigw" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.remote-dictionary.function_name
   principal     = "apigateway.amazonaws.com"
   source_arn    = "${aws_api_gateway_rest_api.remote-dictionary.execution_arn}/*/*"
 }
