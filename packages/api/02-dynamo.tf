resource "aws_dynamodb_table" "remote-dictionary" {
  name           = "Dictionary"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 1
  hash_key       = "word"

  attribute {
    name = "word"
    type =  "S"
  }

  tags = {
    name = "remote-dictionary-table"
  }
}
