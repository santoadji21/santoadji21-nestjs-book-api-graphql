variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "book-api-gql-2023-11"
}

variable "region" {
  description = "The AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "shared_credentials_file" {
  description = "The path to the shared credentials file"
  type        = string
  default     = "~/.aws/credentials"
}
