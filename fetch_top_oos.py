import requests
import pandas as pd
import json

def fetch_and_export_oos():
    url = 'https://data3.instashop.ae/parse/functions/topOOS'
    
    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://instashop.ae',
        'priority': 'u=1, i',
        'referer': 'https://instashop.ae/',
        'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
        'x-is-installation': 'c9bfda2f-e058-4033-996c-4d0a76f6f0e5',
        'x-is-user': 'iK8oLK2RnG',
        'x-parse-application-id': 'Q8p0cZi0Es6POXNb4tNqqP7NdzXsqKd9Mzzdkdq6',
        'x-parse-client-cpayload': 'F4kYDr9yIA',
        'x-parse-client-id': 'F4kYDr9yIA',
        'x-parse-rest-api-key:': 'UCOGUXAS6gqQRy3p184T0TI7M8UDWOoR1AQ5JF7y',
        'x-parse-session-token': 'r:05d392744f53c4e2dd9c5405e8c6d202'
    }
    
    # Note: Fixing the colon in the header key if I copied it literally
    # Wait, the user provided: 'x-parse-rest-api-key: UCOGUXAS6gqQRy3p184T0TI7M8UDWOoR1AQ5JF7y'
    # Actually, the header key should be 'x-parse-rest-api-key'
    
    headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://instashop.ae',
        'priority': 'u=1, i',
        'referer': 'https://instashop.ae/',
        'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
        'x-is-installation': 'c9bfda2f-e058-4033-996c-4d0a76f6f0e5',
        'x-is-user': 'iK8oLK2RnG',
        'x-parse-application-id': 'Q8p0cZi0Es6POXNb4tNqqP7NdzXsqKd9Mzzdkdq6',
        'x-parse-client-cpayload': 'F4kYDr9yIA',
        'x-parse-client-id': 'F4kYDr9yIA',
        'x-parse-rest-api-key': 'UCOGUXAS6gqQRy3p184T0TI7M8UDWOoR1AQ5JF7y',
        'x-parse-session-token': 'r:05d392744f53c4e2dd9c5405e8c6d202'
    }

    payload = {
        "query": {
            "fromDate": "2025-12-25",
            "toDate": "2025-12-25",
            "offset": -120,
            "clientIds": ["jAiZceMV1u"],
            "clientLogin": True
        },
        "systemInfo": {
            "countryId": "vrii93Zwoj"
        }
    }

    print(f"Sending request to {url}...")
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        
        data = response.json()
        results = data.get('result', {}).get('result', [])
        
        if not results:
            print("No results found in the response.")
            return

        print(f"Found {len(results)} items. Exporting to Excel...")
        
        df = pd.DataFrame(results)
        
        output_file = 'top_oos_results.xlsx'
        df.to_excel(output_file, index=False)
        
        print(f"Successfully exported to {output_file}")
        
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    fetch_and_export_oos()
