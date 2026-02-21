from rembg import remove
from PIL import Image
import io

input_path = r"d:\start_up\YouneshPortfolio\frontend\public\images\hero\younesh.png"
output_path = r"d:\start_up\YouneshPortfolio\frontend\public\images\hero\younesh-nobg.png"

with open(input_path, "rb") as f:
    input_data = f.read()

output_data = remove(input_data)

img = Image.open(io.BytesIO(output_data)).convert("RGBA")
img.save(output_path, "PNG")
print(f"Background removed. Saved to {output_path}")
print(f"Image size: {img.size}")
