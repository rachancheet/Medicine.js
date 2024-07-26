## Deployed on Personal ovh VPS
## Test case (command Prompt curl commands):

### add medicine

curl -X POST -H "Content-Type: application/json" -d "{\\"name\\": \\"Aspirin\\", \\"price\\": 5.99, \\"quantity\\": 100, \\"manufacturer\\": \\"Bayer\\"}" https://api.rachancheet.me/medicine

### add medicine with image(replace image.jpg with name)

curl -X POST -H "Content-Type: multipart/form-data" -F "name=Ibuprofen" -F "price=7.99" -F "quantity=50" -F "manufacturer=Advil" -F "image=@image.jpg" https://api.rachancheet.me/api/medicine

### all medicine

curl https://api.rachancheet.me/medicine \n
curl https://api.rachancheet.me/medicine?manufacturer=Bayer \n
curl https://api.rachancheet.me/medicine?sort=-price \n
curl https://api.rachancheet.me/medicine?search=asp^&manufacturer=Bayer^&sort=-price \n
curl -X PATCH -H "Content-Type: application/json" -d "{\\"price\\": 6.99, \\"quantity\\": 75}" https://api.rachancheet.me/medicine/<medicine_id> \n
curl -X DELETE https://api.rachancheet.me/medicine/<medicine_id> \n
