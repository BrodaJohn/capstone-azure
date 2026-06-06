output "public_ip" {
  value       = azurerm_public_ip.pip.ip_address
  description = "Public IP of the Azure VM"
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/capstone_azure_key azureuser@${azurerm_public_ip.pip.ip_address}"
}