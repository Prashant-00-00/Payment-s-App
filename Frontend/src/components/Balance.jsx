
export const Balance = ({ value }) => {
    const formattedBalance = value !== null ? parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Loading...'; 

    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {formattedBalance}
            </div>
        </div>
    );
};
