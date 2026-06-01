#!/usr/bin/env python3
"""process_data.py - convert Dados_porsche_sanitizado.xlsx to clean JSON.
Run inside the .venv: .venv/bin/python process_data.py > data.json
"""
from pandas._typing import ListLikeHashable
import pandas as pd
import json

# Load the Excel file
excel_path = "Dados_porsche_sanitizado.xlsx"
df = pd.read_excel(excel_path)

# Rename columns to match JavaScript expectations
rename_map = {
    "PorscheModelSanitize": "Model",
    "ModelYearSanitized": "ModelYear",
    "CitySanitized": "City",
    "PayMethodSanitized": "PayMethod",
    "SalesPriceSanitized": "Price",
    "VehicleMileageSanitized": "Mileage",
    "FuelConsumptionSanitized": "FuelConsumption",
    # Keep any other columns that may already be correctly named
}
df = df.rename(columns=rename_map)

# Ensure numeric columns are proper numbers
numeric_cols = ["ModelYear", "Price", "Mileage", "FuelConsumption"]
for col in numeric_cols:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors="coerce")

# Output compact JSON (Unicode characters allowed)
print(df.to_json(orient="records", force_ascii=False))
