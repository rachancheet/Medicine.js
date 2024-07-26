Test case:
//add medicine
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Aspirin\", \"price\": 5.99, \"quantity\": 100, \"manufacturer\": \"Bayer\"}" https://api.rachancheet.me/api/medicines
//add medicine with image(replace image.jpg with name)
curl -X POST -H "Content-Type: multipart/form-data" -F "name=Ibuprofen" -F "price=7.99" -F "quantity=50" -F "manufacturer=Advil" -F "image=@image.jpg" https://api.rachancheet.me/api/medicines
//all medicine
curl https://api.rachancheet.me/api/medicines

curl https://api.rachancheet.me/api/medicines?manufacturer=Bayer

curl https://api.rachancheet.me/api/medicines?sort=-price

curl https://api.rachancheet.me/api/medicines?search=asp^&manufacturer=Bayer^&sort=-price

curl -X PATCH -H "Content-Type: application/json" -d "{\"price\": 6.99, \"quantity\": 75}" https://api.rachancheet.me/api/medicines/<medicine_id>

curl -X DELETE https://api.rachancheet.me/api/medicines/<medicine_id>
