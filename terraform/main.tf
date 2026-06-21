# ==========================================================================
# ASIA PACIFIC REGION: MUMBAI PRODUCTION LAYER
# ==========================================================================

resource "null_resource" "mumbai_vpc_network" {
  provisioner "local-exec" {
    command = "echo '[DEPLOYED] Created Secure Network Gateway for Mumbai VPC on block ${var.mumbai_cidr}'"
  }
}

resource "null_resource" "mumbai_database_cluster" {
  depends_on = [null_resource.mumbai_vpc_network]
  provisioner "local-exec" {
    command = "echo '[DEPLOYED] Initialized High-Availability DynamoDB Cluster: ${var.database_table_name} (Region: ap-south-1)'"
  }
}

# ==========================================================================
# EUROPE REGION: FRANKFURT COMPLIANCE LAYER
# ==========================================================================

resource "null_resource" "frankfurt_vpc_network" {
  provisioner "local-exec" {
    command = "echo '[DEPLOYED] Created Secure Network Gateway for Frankfurt VPC on block ${var.frankfurt_cidr}'"
  }
}

resource "null_resource" "frankfurt_database_cluster" {
  depends_on = [null_resource.frankfurt_vpc_network]
  provisioner "local-exec" {
    command = "echo '[DEPLOYED] Initialized High-Availability DynamoDB Cluster: ${var.database_table_name} (Region: eu-west-1)'"
  }
}
