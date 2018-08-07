## Better Cash Flow
Poor cash flow management is a top reason why many small business owners and entrepreneurs are forced to close.  This application links payables to sources to help model cash and credit balances over time.

## Motivation
I chose this application as my final, full-stack project at DigitalCrafts because it met my personal need to use technology for practical purposes and it fulfilled the requirements of the final project.  These requirements included:  use of a modern javascript framework, integration with a back-end database, and deployment to a cloud services provider.  This project got its start as a limited proof-of-concept at the "Hack Big for Small Business Hackathon" in Atlanta in December 2017.

## Current Status
I developed Better Cash Flow as a tool to reinforce React/Redux skills acquired in my coding bootcamp experience and to meet the final project requirements.  I intend to expand it further by integrating a financial services aggregator (Yodlee?) to replace the 'dead' code tied to USBank and Visa (hackathon sponsors).

## Screenshots
![BetterCashFlow Logo](/client/public/images/BCFScreenshot.png)

## See it in action on YouTube
![BetterCashFlow on youtube](https://youtu.be/MWlJcrNcJJw)

## Tech/framework used

<b>Built with</b>
- [React](https://reactjs.org)
- [Redux](https://reduxjs.org)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [MySQL](https://mysql.com)
- [react-timeseries-charts](http://software.es.net/react-timeseries-charts/)

## Features
* Simple, Fast UI:  the data table has the familiar look and feel of a spreadsheet
* Real-time feedback:  changes to the payables data table are immediately reflected across 3 different components (Summary in Nav, Analyzer, and Time-Series Chart)
* Data Persistence:  the data table can be imported, exported or saved to the back-end database.  This allows modeling work to be shared or reused.


## Credits
<b>Shout outs to the BetterCashFlow Hackathon team:<b>
- [Song Wei](https://github.com/bluepine) - our one and only professional developer.  Song worked tirelessly over 36 hours to get us to a presentable v0.1.
- [Michael McFarland](https://github.com/mcfarland422) - one of our 2 designers.  Logo designer and demo driver for the pitch.
- [Neil Zhang](https://www.linkedin.com/in/chufengzhang/) - our other designer.  Your storyboard "slideware" and clean aesthetic were inspirational.

<b>A big thank you to [Allen Fang](https://github.com/AllenFang)<b>! Allen's bootstrap-react-table is at the core of this application.

<b>And thanks to the folks at [ESnet](http://www.es.net) for making [react-timeseries-charts](http://software.es.net/react-timeseries-charts/).  They helped make the responsive stacked-bar possible.
