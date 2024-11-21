import CurrencyCard from "@/components/currency card/CurrencyCard"
function page() {
  return (
    <div>
        page
        <CurrencyCard name="test" priceChange24hr={45} symbol="xx" currentPrice={45} />
    </div>
  )
  
}

export default page