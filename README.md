# scrape-aa

Make sure you have proper chromedriver version installed 

Install Requirements
```
pip3 install -r requirements.txt
```


Make dir www/public_html
```
mkdir www/public_html
```


Run Python Web Server from www/public_html
```
cd www/public_html
python3 -m http.server 8080
```

Update Search settings and run scrape.py from the base Dir
```
python3 scrape.py
```