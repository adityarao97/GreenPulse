# parse_defra.py
import pandas as pd

def load_emission_factors(defra_file_path):
    """
    Load emission factors from the DEFRA Excel file.
    Returns a dictionary mapping activity types to emission factors.
    """
    xls = pd.ExcelFile(defra_file_path)
    factors = {}

    # COMMUTE - Lower medium petrol car (kg CO2e per km)
    try:
        df_vehicles = pd.read_excel(xls, sheet_name="Passenger vehicles", skiprows=23)
        commute_row = df_vehicles[
            (df_vehicles["Unnamed: 1"].fillna("").str.lower() == "lower medium") &
            (df_vehicles["Unnamed: 2"].fillna("").str.lower() == "km")
        ]
        factors['commute_km'] = float(commute_row["Unnamed: 9"].values[0])
    except Exception as e:
        print(f"Error extracting commute emission factor: {e}")

    # ELECTRICITY - UK electricity (kg CO2e per kWh)
    try:
        df_electricity = pd.read_excel(xls, sheet_name='UK electricity', skiprows=8)
        elec_row = df_electricity[df_electricity["Unnamed: 4"].apply(pd.to_numeric, errors='coerce').notna()].iloc[0]
        factors['electricity_kwh'] = float(elec_row["Unnamed: 4"])
    except Exception as e:
        print(f"Error extracting electricity emission factor: {e}")

    # FLIGHT - Domestic flights (kg CO2e per passenger km)
    try:
        df_flight = pd.read_excel(xls, sheet_name='Business travel- air', skiprows=8)
        flight_row = df_flight[df_flight['Unnamed: 1'].fillna('').str.contains('Domestic', case=False)]
        factors['flight_km'] = float(flight_row["Unnamed: 4"].values[0])
    except Exception as e:
        print(f"Error extracting flight emission factor: {e}")

    # BUS - Public bus travel (kg CO2e per passenger km)
    try:
        df_bus = pd.read_excel(xls, sheet_name='Business travel- land', skiprows=8)
        bus_row = df_bus[df_bus['Unnamed: 1'].fillna('').str.contains('Bus', case=False)]
        factors['bus_km'] = float(bus_row["Unnamed: 4"].values[0])
    except Exception as e:
        print(f"Error extracting bus emission factor: {e}")

    # STEPS - Physical activity has no emissions
    factors['steps_steps'] = 0.0

    return factors

# Test the function
if __name__ == "__main__":
    print(load_emission_factors("defra.xlsx"))
