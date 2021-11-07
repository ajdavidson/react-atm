const ATMDeposit = ({onChange, isDeposit, isValid}) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
        <label className="label huge">
            <h3><i className="fas fa-money-bill-wave"></i> {choice[Number(!isDeposit)]}</h3>
            <input id="number-input" type="number" width="200" step="20" min="0" max="1000" onChange={onChange}
                   onKeyPress={preventMe} onPaste={preventMe}/>
            <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"/>
        </label>
    );
};

const preventMe = (e) => {
    e.preventDefault();
};

const Account = () => {
    // let deposit = 0; // state of this transaction
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);

    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
        console.log(Number(event.target.value));
        if (Number(event.target.value) <= 0) {
            return setIsValid(false);
        }
        if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
        setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
        let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
        setTotalState(newTotal);
        setIsValid(false);
        event.preventDefault();
    };

    const handleModeSelect = (event) => {
        console.log(event.target.value);
        setAtmMode(event.target.value);
        setIsValid(false);
        if (event.target.value === 'Deposit') {
            setIsDeposit(true);
        } else {
            setIsDeposit(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <>
                <h3><i className="fas fa-piggy-bank"></i> Welcome to PIGGY Bank</h3>
                <h3 id="total"><i className="fas fa-chart-bar"></i> {status}</h3>
                <label>Select an action below to continue</label>
                <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
                    <option id="no-selection" value=""/>
                    <option id="deposit-selection" value="Deposit">
                        Deposit
                    </option>
                    <option id="cashback-selection" value="Cash Back">
                        Cash Back
                    </option>
                </select>
                {atmMode && (
                    <ATMDeposit
                        onChange={handleChange}
                        isDeposit={isDeposit}
                        isValid={isValid}
                    />
                )}
            </>
        </form>
    );
};
// ========================================
ReactDOM.render(<Account/>, document.getElementById('root'));
