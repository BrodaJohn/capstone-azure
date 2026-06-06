# 🚀 Capstone Project: Containerized App Deployment on Azure

![Azure](https://img.shields.io/badge/Azure-VM-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-App-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📋 Project Overview

This project demonstrates a **real-world DevOps workflow** for deploying a containerized Node.js application to Microsoft Azure using Infrastructure as Code and a fully automated CI/CD pipeline.

Every push to the `main` branch automatically builds a Docker image, pushes it to Docker Hub, and deploys it to an Azure Virtual Machine — with zero manual intervention.

---

## 🏗️ Architecture

```
Developer → GitHub → GitHub Actions → Docker Hub → Azure VM → Nginx → Container
```

| Component | Technology |
|---|---|
| Application | Node.js + Express |
| Containerization | Docker |
| Infrastructure | Terraform (azurerm provider) |
| CI/CD Pipeline | GitHub Actions |
| Image Registry | Docker Hub |
| Cloud Platform | Microsoft Azure |
| Web Server | Nginx (reverse proxy) |
| VM OS | Ubuntu 18.04 LTS |
| Region | North Europe |

---

## 📁 Project Structure

```
capstone-azure/
│
├── app/
│   ├── server.js          # Node.js Express application
│   └── package.json       # Node.js dependencies
│
├── terraform/
│   ├── providers.tf       # Azure provider configuration
│   ├── variables.tf       # Input variables
│   ├── main.tf            # Azure infrastructure resources
│   └── outputs.tf         # Output values (Public IP, SSH command)
│
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions CI/CD pipeline
│
├── Dockerfile             # Container image definition
├── .gitignore             # Excludes Terraform state and provider binaries
└── README.md              # Project documentation
```

---

## ☁️ Azure Infrastructure (Terraform)

The following resources are provisioned automatically using Terraform:

- **Resource Group** — `capstone-rg`
- **Virtual Network** — `capstone-vnet` (10.0.0.0/16)
- **Subnet** — `capstone-subnet` (10.0.1.0/24)
- **Public IP** — Static, Standard SKU
- **Network Security Group** — Allows inbound SSH (22) and HTTP (80)
- **Network Interface** — Attached to subnet and public IP
- **Linux Virtual Machine** — Ubuntu 18.04 LTS, Standard_D2s_v3
  - Docker installed via `custom_data` startup script
  - Nginx installed and configured as reverse proxy (port 80 → 3000)

---

## ⚙️ CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/deploy.yml`) runs on every push to `main` and has two jobs:

### Job 1 — Build & Push
1. Checks out the code
2. Logs in to Docker Hub
3. Builds the Docker image tagged with `latest` and the git SHA
4. Pushes both tags to Docker Hub

### Job 2 — Deploy
1. Configures SSH using the private key stored in GitHub Secrets
2. SSHs into the Azure VM
3. Pulls the latest image from Docker Hub
4. Stops and removes the old container
5. Runs the new container on port 3000
6. Verifies deployment via the `/health` endpoint

---

## 🔐 GitHub Secrets Required

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (Read, Write, Delete) |
| `AZURE_VM_IP` | Public IP of the Azure VM |
| `AZURE_VM_USER` | VM admin username (`azureuser`) |
| `SSH_PRIVATE_KEY` | Private SSH key for VM access |
| `ARM_CLIENT_ID` | Azure Service Principal client ID |
| `ARM_CLIENT_SECRET` | Azure Service Principal client secret |
| `ARM_TENANT_ID` | Azure tenant ID |
| `ARM_SUBSCRIPTION_ID` | Azure subscription ID |

---

## 🚀 How to Deploy

### Prerequisites
- Azure CLI installed and authenticated
- Terraform >= 1.3.0
- Docker Desktop
- Git

### 1. Clone the repository
```bash
git clone https://github.com/BrodaJohn/capstone-azure.git
cd capstone-azure
```

### 2. Generate SSH key pair
```bash
ssh-keygen -t rsa -b 4096 -C "capstone-azure" -f ~/.ssh/capstone_azure_key
```

### 3. Provision Azure infrastructure
```bash
cd terraform
terraform init
terraform apply -var="ssh_public_key=$(cat ~/.ssh/capstone_azure_key.pub)"
```

### 4. Add GitHub Secrets
Add all 9 secrets listed above to your GitHub repository under:
`Settings → Secrets and variables → Actions`

### 5. Push to trigger the pipeline
```bash
git push origin main
```

The pipeline will automatically build, push, and deploy the application.

---

## 🌐 Application Endpoints

Once deployed, the application is accessible at:

| Endpoint | Description |
|---|---|
| `http://<VM_PUBLIC_IP>/` | Main application page |
| `http://<VM_PUBLIC_IP>/health` | Health check — returns `{"status":"OK","platform":"Azure"}` |

---

## 🧹 Cleanup

To destroy all Azure resources and avoid charges:

```bash
cd terraform
terraform destroy -var="ssh_public_key=$(cat ~/.ssh/capstone_azure_key.pub)" -auto-approve
```

---

## 📚 Technologies Used

- [Microsoft Azure](https://azure.microsoft.com) — Cloud platform
- [Terraform](https://www.terraform.io) — Infrastructure as Code
- [Docker](https://www.docker.com) — Containerization
- [GitHub Actions](https://github.com/features/actions) — CI/CD automation
- [Docker Hub](https://hub.docker.com) — Container image registry
- [Node.js](https://nodejs.org) — Application runtime
- [Nginx](https://nginx.org) — Reverse proxy web server

---

## 👨‍💻 Author

**BrodaJohn**
Cloud/DevOps Engineer — Azure & AWS Certified Training

---

## 📄 License

This project is for educational purposes as part of a Cloud/DevOps Engineering Capstone.
