import { Code, H1, H2, Image, Li, Link, List, P, VideoYouTube } from "../components";
import imgEdgar from "./images/edgar.png";
import imgExcelMain from "./images/excel-main.png";
import imgInvestorRelations from "./images/investor-relations.png";

const investorRelationsSize = { width: 1288, height: 925 };
const edgarSize = { width: 1415, height: 754 };
const excelMainSize = { width: 674, height: 274 };

export const Article = () => (
  <>
    <P>
      Notes about how to read US publicly-traded company{" "}
      <Link href="https://www.investopedia.com/terms/e/earningsreport.asp">earnings reports</Link>. The notes are based
      on example of analyzing Alphabet (Google parent company) and by this video by Martin Skreli.
    </P>

    <VideoYouTube id="zpnv_g8lfEA" title="Analyzing Google from scratch by Martin Shkreli" />

    <H1>How to find company earnings reports</H1>

    <P>Lets take example of Alphabet and finding earnings for 2022 Q1. There are 2 most common ways</P>

    <H2>Company investor relations</H2>

    <Image
      src={imgInvestorRelations}
      width={investorRelationsSize.width / 5}
      height={investorRelationsSize.height / 5}
      alt="Alphabet company investor relations page"
    />

    <List>
      <Li>
        Search for <Code>{`<company name> investor relations`}</Code>
      </Li>
      <Li>
        For Alphabet it will lead you to <Link>https://abc.xyz/investor/</Link>
      </Li>
      <Li>
        There you can find "Earnings" document for each quarter and also videos or presentations accompanying these
        documents.
      </Li>
      <Li>
        Document that you should find on that page:{" "}
        <Link href="https://abc.xyz/investor/static/pdf/2022Q1_alphabet_earnings_release.pdf?cache=d9e9d97">
          Alphabet Announces First Quarter 2022 Results
        </Link>
      </Li>
    </List>

    <H2>SEC EDGAR</H2>

    <Image
      src={imgEdgar}
      width={edgarSize.width / 5}
      height={edgarSize.height / 5}
      alt="SEC EDGAR Alphabet company page"
    />

    <P>
      All publicly-traded companies need to use EDGAR to submit required documents, so the earning reports can also be
      found there.
    </P>

    <List>
      <Li>
        Go to <Link>https://www.sec.gov/edgar</Link>
      </Li>
      <Li>
        Search for the company name or ticket there, it should lead you to{" "}
        <Link href="https://www.sec.gov/edgar/browse/?CIK=1652044&owner=exclude">
          Alphabet Inc. GOOGL, GOOG on Nasdaq
        </Link>{" "}
        page
      </Li>
      <Li>
        Look for <Code>10-K</Code> report (annual earnings) or <Code>10-Q</Code> report (quarterly earnings)
      </Li>
      <Li>
        Document that you should find on that page:{" "}
        <Link href="https://www.sec.gov/ix?doc=/Archives/edgar/data/1652044/000165204422000029/goog-20220331.htm">
          Alphabet Inc FORM 10-Q
        </Link>
      </Li>
    </List>

    <P>Note that</P>

    <List>
      <Li>Most of the values are in millions or thousands (you can find the scale in the table header usually)</Li>
      <Li>
        Negative numbers have brackets around them
        <List>
          <Li>
            Positive number <Code>{`12,345`}</Code>
          </Li>
          <Li>
            Negative number <Code>{`(12,345)`}</Code>
          </Li>
        </List>
      </Li>
    </List>

    <H1>6 questions to ask of any stock </H1>

    <P>These are also sometimes called capital structure</P>

    <List>
      <Li>
        Share price
        <List>
          <Li>
            Get from searching <Code>{`<company name or ticker> stock price`}</Code>
          </Li>
          <Li>
            At the time when video was created it was <Code>2,207.85</Code> USD
          </Li>
        </List>
      </Li>
      <Li>
        Shares outstanding
        <List>
          <Li>Find In the earnings</Li>
          <Li>
            In the Alphabet earning document search for <Code>Number of shares</Code>
          </Li>
          <Li>
            <Code>667,551</Code> (thousands)
          </Li>
        </List>
      </Li>
      <Li>
        MC (Market Cap)
        <List>
          <Li>
            <Code>Shares outstanding * Share price</Code>
          </Li>
          <Li>
            <Code>2,207 * 667,551,000 = 1,473,852,057,000</Code>
          </Li>
        </List>
      </Li>
      <Li>
        Cash
        <List>
          <Li>Find In the earnings</Li>
          <Li>
            In the Alphabet earning document search for{" "}
            <Code>Total cash, cash equivalents, and marketable securities</Code>
          </Li>
          <Li>
            We can include anything thats like cash, so also
            <Code>Non marketable securities</Code>
          </Li>
          <Li>
            <Code>139,649 + 29,549 = 169,198</Code> (million)
          </Li>
        </List>
      </Li>
      <Li>
        Debt
        <List>
          <Li>Find In the earnings</Li>
          <Li>
            In the Alphabet earning document search for <Code>Long-term debt</Code>
          </Li>
          <Li>
            <Code>14,817</Code> (million)
          </Li>
        </List>
      </Li>
      <Li>
        <Link href="https://www.investopedia.com/terms/e/enterprisevalue.asp">EV (Enterprise value)</Link>
        <List>
          <Li>Arguably the most important of these 6, is the value you are paying for the business itself</Li>
          <Li>
            <Code>EV = MC - Cash + Debt</Code>
          </Li>
          <Li>
            <Code>1,495 - 169 + 14 = 1,319</Code> (million)
          </Li>
          <Li>
            Example: lets say you are buying a company that owns a building
            <List>
              <Li>Company price: 10,000,000</Li>
              <Li>One deed for the building</Li>
              <Li>Debt: 2,000,000</Li>
              <Li>Cash: 500,000</Li>
            </List>
            If you buy the company for 10,000,000, you are also liable for the 2,000,000 and also you get 500,000 cash.
            The company's total value that you are paying would be{" "}
            <Code>{`11,500,000 = 10,000,000 + 2,000,000 - 500,000`}</Code>
          </Li>
        </List>
      </Li>
    </List>

    <P>Now fill these numbers for the Alphabet stock. For the 2022 Q1 you should have these values</P>

    <Image
      src={imgExcelMain}
      width={excelMainSize.width / 2}
      height={excelMainSize.height / 2}
      alt="6 questions for the Alphabet stock"
    />

    <H1>The model</H1>

    {/*

The model
    You dont want to automate this process, there is lots of nuances for each company, but there are

    Base numbers (todo: rename)
        Revenue
            Earnings "Revenues"
        COGS
            Cost of Goods Sold
            Earnings "Cost of revenues"
            https://www.investopedia.com/terms/c/cogs.asp
        Gross Profit
            https://www.investopedia.com/terms/g/grossprofit.asp
            Revenue - Gross Profit
        R&D
            Earnings "Research and development"
        S&M
            Earnings "Sales and marketing"
        G&A
            Earnings "General and administrative"
        OpEx
            Operating expense
            https://www.investopedia.com/terms/o/operating_expense.asp
            R&D + S&M + G&A
        OpInc
            Operating income
            https://www.investopedia.com/terms/o/operatingincome.asp
            COGS - OpEx
                or Earnings "Income from operations"
        Other
            Earnings "Other income (expense), net"
        Pretax
            Earnings "Income before income taxes"
        Taxes
            Earnings "Provision for income taxes"
        Net Income
            Pretax - Taxes
                of Earnings "Net income"
        EPS
            Earnings Per Share
            https://www.investopedia.com/terms/e/eps.asp
            Net Income / Shares
                or Earings "Diluted earnings per share of Class A and B common stock and Class C capital stock"
        Shares
            Earnings "Total liabilities and stockholders’ equity"

    Company Changes (todo rename)
        Revenue Growth
            Revenue current quartal / Revenue same quartal 1 year ago - 1
        Gross Margin
            Gross profit / Revenue

    Cash flow stuff
        CFFO
            Cash Flow From Operations or Cash Flow From Operating Activities
            https://www.investopedia.com/terms/c/cash-flow-from-operating-activities.asp
            Earnings "Net cash provided by operating activities"
        CapEx
            Capital Expenditure
            https://www.investopedia.com/terms/c/capitalexpenditure.asp
            Earnings "Purchases of property and equipment"
        FCF
            Free cash flow
            https://www.investopedia.com/terms/f/freecashflow.asp
            CFFO - CapEx

At this point you should have filled the data for current quarter and quarter from the year before

Add company/sector specific data
    We can add company specific interesting revenue breakdown
        Earnings "Segment results" and "Revenues, Traffic Acquisition Costs (TAC) and number of employees"

        We can break the revenues to
            Cloud
            Search
            YouTube
            Other

    We can add interesting growth/decline/percentage numbers that are Alphabet specific
        Search % of Rev

    TODO: optimalize images
    TODO: what he does about doing some PE ratio

    TODO: image of income and stuff that is currently in downloads forlder
    TODO: link xlsx model
    TODO: better title and description for the whole article
      Maybe add there somthing like
        How to analyze Alphabet from scratch?

    */}
  </>
);
