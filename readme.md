# Financial Advisor

Software I am developing, primarily to help me with my own personal and business accounting. But, also going through the motions to apply everything I've learned up to this point to build this project as a portfolio item.

After all, it will be a great to showcase my approach to software design and development. 

Currently, it is setup as a decoupled web app with client and server separated but in the same repo for now.


The BE is set up using NodeJS + MySQL
	`cd /backend`	    # 
	``					# Create .env file to store config for mysql connection	
	`npm run install`   # install dependencies
	`npm run start`		# starts dev server

The FE is set up using React
	`cs /frontend`      #
	``					# Create data/ to store placeholder objects to run and test without DB
	`npm install`		# install dependencies
	`npm run start` 	# starts dev server


With the decoupled architecture, I am able to isolate my focus on front-end UI or back-end data analysis. It also allows me to sub out the front-end or back-end.

Ways I would like to be able to sort the transactions:
- group by name, category, frequency, price
- map them chronologically
- assign labels to identify which are business vs personal
- mark one-off purchases, gauge risk level of purchase (planned vs impulse)
- research alternatives for recurring and planned purchases for cost reduction possibilities
- reflect on impulse purchases and analyze what made them happen, if it was actually a good thing or a bad thing

Being able to sort the transactions will allow me to analyze my spending history in order to forecast my future spending and targeted budget to sustain my life and on-going personal development. 


Purchases
Money Transfer


