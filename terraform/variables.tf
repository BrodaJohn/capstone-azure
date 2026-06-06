variable "resource_group_name" {
  default = "capstone-rg"
}
variable "location" {
  default = "West US 3"
}
variable "vm_size" {
  default = "Standard_D2s_v3"
}
variable "admin_username" {
  default = "azureuser"
}
variable "ssh_public_key" {
  description = "Contents of your ~/.ssh/capstone_azure_key.pub"
}
