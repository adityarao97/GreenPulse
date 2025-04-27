import pandas as pd
import math

def build_defra_dict(file_path):
    xls = pd.ExcelFile(file_path)
    emission_dict = {}

    for sheet in xls.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet)

        df = df.iloc[:, :4]  # Only first 4 columns

        # ✅ Fill merged cells in first column
        df.iloc[:, 0] = df.iloc[:, 0].ffill()

        for _, row in df.iterrows():
            if len(row) < 4:
                continue

            # Check if emission factor is a valid number
            try:
                emission = float(row.iloc[3])
            except (ValueError, TypeError):
                continue  # Skip if not a number

            activity = str(row.iloc[0]).strip().lower()
            typ = str(row.iloc[1]).strip().lower()
            unit = str(row.iloc[2]).strip().lower()

            key = f"{activity}_{typ}_{unit}".replace(" ", "_").replace("__", "_").replace("/", "_")
            emission_dict[key] = emission

    # ✅ Drop NaN values
    clean_emission_dict = {k: v for k, v in emission_dict.items() if not (math.isnan(v) if isinstance(v, float) else False)}

    return clean_emission_dict

if __name__ == "__main__":
    file_path = "defra_clean.xlsx"
    emission_mapping = build_defra_dict(file_path)

    print("\nBuilt CLEAN emission dictionary successfully!\n")
    print(f"Total valid entries (non-NaN): {len(emission_mapping)}\n")

    for key, value in emission_mapping.items():
        print(f"{key} : {value} kg CO₂e")
