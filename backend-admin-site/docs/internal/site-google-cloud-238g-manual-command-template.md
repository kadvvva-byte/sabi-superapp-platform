# 238G — Manual Google Cloud command template

Internal only. Do not run these commands automatically. They are written as templates for a later staging-only approval.

```powershell
# DRY-RUN TEMPLATE ONLY — DO NOT RUN UNTIL SEPARATE OWNER APPROVAL
# cd C:\Users\User\Desktop\superapp
# gcloud config set project <GOOGLE_CLOUD_PROJECT_ID>
# gcloud storage buckets create gs://<STAGING_BUCKET_OR_HOSTING_TARGET> --project=<GOOGLE_CLOUD_PROJECT_ID> --location=<GOOGLE_CLOUD_REGION>
# gcloud storage cp --recursive .\site-ui\* gs://<STAGING_BUCKET_OR_HOSTING_TARGET>/
# gcloud storage buckets update gs://<STAGING_BUCKET_OR_HOSTING_TARGET> --web-main-page-suffix=index.html --web-error-page=404.html
```

## Alternative static target template

```powershell
# DRY-RUN TEMPLATE ONLY — DO NOT RUN UNTIL SEPARATE OWNER APPROVAL
# Firebase Hosting / Google Cloud static hosting may be selected later.
# The exact command must be generated only after project ID, staging target, and Owner approval are provided.
```

## Rollback template

```powershell
# DRY-RUN TEMPLATE ONLY — DO NOT RUN UNTIL SEPARATE OWNER APPROVAL
# Re-upload FIX75 static files to the staging target.
# Run staging smoke again before continuing.
```
