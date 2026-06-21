variable "mumbai_cidr" {
  description = "CIDR block for Mumbai VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "frankfurt_cidr" {
  description = "CIDR block for Frankfurt VPC"
  type        = string
  default     = "10.1.0.0/16"
}

variable "database_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
  default     = "sovereign-data-table"
}
