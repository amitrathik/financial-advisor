Building a few modules in node to read and manipulate my financial statement data 


If CREDIT, split description by space, first string should be posting data mm/dd, inject year based on statement


Now that I have my transactions in CSV format, it's time to follow the money.

I manually entered in my transactions for 9687 and so I anticipate having typos and other errors, but I can still move forward with the general functionality and modules.

Questions to answer:
- How much money flowed into my bank account(s)?
- Where did that money come from?
- What needs to be reported to IRS?

- How much money flowed out of my bank account(s)?
- Where did the money go?
- What can be written off as business expenses?

Anything else I need to know?


Some goals for the application:
- Group my transactions by frequency
- Visualize my transactions in a calendar view to better visualize my upcoming bills and expenses to develop a better budget and financial plan

Currently, my mindset is to think about this from a personal use case, but eventually, I'd like to refactor the code for a business application or for a consumer market.

Some goals for this project:
- Limiting myself to a programming language and it's native functionality to architect the logic without using third-party dependencies.
- For this project, I am using Node and going to learn more about manipulating files and data with Node
- It would be cool to then develop this application with other programming languages like Python to see how it compares in performance and other benchmarks



		this.details = details;
		this.postingDate = postingDate;
		this.description = description;
		this.amount = amount;
		this.type = type;
		this.balance = balance;
		this.checkOrSlipNo = checkOrSlipNo;