# Creative Studio Deployment Summary

## What's Deployed

| Component | URL | Tech |
|-----------|-----|------|
| **Frontend** | https://creative-studio-demo-481305.web.app | Angular 18, Firebase Hosting |
| **Backend** | https://cstudio-be-577666195296.us-central1.run.app | Python/FastAPI, Cloud Run |
| **Database** | Cloud SQL PostgreSQL | `creative-studio-db-6c40c5cd` |

## Auto-Deploy (on push to `main`)

- `frontend/**` changes → triggers frontend build
- `backend/**` changes → triggers backend build

View the status of deployed things by looking at: https://console.cloud.google.com/cloud-build/builds?project=creative-studio-demo-481305

## Manual Deploy Commands

Requires setting up gcloud CLI and running `glcoud auth login`

```bash
# Backend
gcloud builds triggers run cstudio-be-trigger --branch=main --project=creative-studio-demo-481305 --region=us-central1

# Frontend
gcloud builds triggers run creative-studio-demo-481305-trigger --branch=main --project=creative-studio-demo-481305 --region=us-central1
```

## Local Dev

```bash
cd frontend
npm install
npm run start  # http://localhost:4200
```

## Terraform (Infra Changes)

Hopefully we never need to change anything here but the deployed environment is `dev-infra`

```bash
cd infra/environments/dev-infra
terraform apply -var-file="dev-infra.tfvars"
```

## Key Files

- `infra/environments/dev-infra/dev-infra.tfvars` - deployment config
- `frontend/src/environments/environment.development.ts` - local dev config
- `frontend/src/environments/environment.prod.ts` - prod config (placeholders, filled at build time)
