const ATMDeposit = ({onChange, isDeposit, isValid}) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
        <React.Fragment>
            <h3 style={{marginBottom: "5px", marginTop: "7px"}}><i
                className="fas fa-money-bill-wave"></i> {choice[Number(!isDeposit)]}</h3>
            <input style={{
                border: "3px solid #7FFF00",
                borderRadius: "7px",
                fontWeight: "bold",
                color: "#006dad",
                paddingRight: "5px",
                marginRight: "7px"
            }} id="number-input" type="number" width="200" step="20" min="0" max="1000" onChange={onChange}
                   onKeyPress={preventMe} onPaste={preventMe}/>
            <input style={{border: "3px solid #7FFF00", borderRadius: "7px", fontWeight: "bold", color: "#006dad"}}
                   type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"/>
        </React.Fragment>
    );
};

const preventMe = (e) => {
    e.preventDefault();
};


const Account = () => {
    const defAtmMsg = 'PIGGY Bank ATM';
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(2700);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMsg, setAtmMsg] = React.useState('Welcome to PIGGY Bank');
    const [atmMode, setAtmMode] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const [grossTotalD, setGrossTotalD] = React.useState(0);
    const [grossTotalW, setGrossTotalW] = React.useState(0);
    const [lightD, setLightD] = React.useState('#FFFFFF00');
    const [lightW, setLightW] = React.useState('#FFFFFF00');

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
        let grossTotal = isDeposit ? grossTotalD + deposit : grossTotalW - deposit;
        if (isDeposit) {
            setGrossTotalD(grossTotal)
        } else {
            setGrossTotalW(grossTotal)
        }
        console.log('Gross Total:' + grossTotal);
        console.log('Gross TotalD:' + grossTotalD);
        console.log('Gross TotalW:' + grossTotalW);


        setTotalState(newTotal);

        setIsValid(false);
        event.preventDefault();
        let msg = isDeposit ? 'Depositing...' : 'Please take your Cash...';
        setAtmMsg(msg);
        setTimeout(function () {
            setAtmMsg('Transaction Complete...');
        }, 2000);
        setTimeout(function () {
            setAtmMsg(defAtmMsg);
        }, 4000);
    };

    const handleModeSelect = (event) => {
        console.log(event.target.value);
        setAtmMode(event.target.value);
        setIsValid(false);
        if (event.target.value === 'Deposit') {
            setAtmMsg('Enter Cash Below...');
            setTimeout(function () {
                setAtmMsg('Up to $1000...');
            }, 2000);
            setLightW('#FFFFFF00');
            setLightD('#7FFF00');
            setIsDeposit(true);

        } else {
            setAtmMsg('Preparing to dispense...');
            setTimeout(function () {
                setAtmMsg('Enter Amount Below...');
            }, 2000);
            setLightD('#FFFFFF00')
            setLightW('#7FFF00');
            setIsDeposit(false);
        }
        setTimeout(function () {
            setAtmMsg(defAtmMsg);
        }, 4000);
    };
    const handleQuick = (num) => {
        setTotalState(totalState - num);
        setAtmMsg('QuickCash: $' + num);
        setGrossTotalW(grossTotalW - num)
        setTimeout(function () {
            setAtmMsg(defAtmMsg);
        }, 1000);
        setLightW('#7FFF00');
        setTimeout(function () {
            setLightW('#fFFFFF00');
        }, 1000);
    };
    const handleLowFunds = () => {
        setAtmMsg('Insufficient Funds...');
        setTimeout(function () {
            setAtmMsg(defAtmMsg);
        }, 1000);
    };

    return (
        <React.Fragment>
            <div style={{
                height: "70px",
                position: "absolute",
                left: "265px",
                top: "355px",
                border: "2px dashed #7FFF00",
                padding: "5px"
            }}>

                <label><i
                    className="fas fa-file-invoice-dollar"></i> Transaction Log</label>
                <hr style={{borderTop: "1px dotted #7FFF00", marginTop: "2px"}}/>
                <label><i
                    className="far fa-plus-square"></i> : {grossTotalD}</label><br/>
                <label><i
                    className="far fa-minus-square"></i> : {grossTotalW}</label>
            </div>
            <div style={{
                height: "10px",
                width: "142px",
                position: "absolute",
                left: "342px",
                top: "500px",
                border: "0",
                borderRadius:"15px",
                padding: "0px",
                backgroundColor: lightD
            }}/>
            <div style={{
                height: "37px",
                width: "321px",
                position: "absolute",
                left: "96px",
                top: "610px",
                border: "0",
                borderRadius:"15px",
                padding: "0px",
                backgroundColor: lightW
            }}/>

            <button
                style={{left: "26px", top: "285px"}}
                // onClick={() => totalState >= 20 ? setTotalState(totalState - 20) : ''}
                onClick={() => totalState >= 20 ? handleQuick(20) : handleLowFunds()}
            >20
            </button>
            <button
                style={{left: "26px", top: "326px"}}
                onClick={() => totalState >= 40 ? handleQuick(40) : handleLowFunds()}
            >40
            </button>
            <button
                style={{left: "26px", top: "367px"}}
                onClick={() => totalState >= 60 ? handleQuick(60) : handleLowFunds()}
            >60
            </button>
            <button
                style={{left: "26px", top: "408px"}}
                onClick={() => totalState >= 80 ? handleQuick(80) : handleLowFunds()}
            >80
            </button>
            <button
                style={{left: "463px", top: "285px"}}
                onClick={() => totalState >= 100 ? handleQuick(100) : handleLowFunds()}
            >100
            </button>
            <button
                style={{left: "463px", top: "326px"}}
                onClick={() => totalState >= 200 ? handleQuick(200) : handleLowFunds()}
            >200
            </button>
            <button
                style={{left: "463px", top: "367px"}}
                onClick={() => totalState >= 500 ? handleQuick(500) : handleLowFunds()}
            >500
            </button>
            <button
                style={{left: "460px", top: "408px", width: "50px"}}
                onClick={() => totalState >= 1000 ? handleQuick(1000) : handleLowFunds()}
            >1000
            </button>

            <form onSubmit={handleSubmit}>

                <h3 style={{marginLeft: "0px"}}><i className="fas fa-piggy-bank fa-2x"></i> {atmMsg}</h3>
                <h3 id="total"><i className="fas fa-chart-bar fa-lg"></i> {status}</h3>
                <label>Select or use QuickCash Buttons</label>
                <select style={{
                    border: "3px solid #7FFF00",
                    borderRadius: "7px",
                    fontWeight: "bold",
                    color: "#006dad",
                    marginTop: "5px"
                }}
                        onChange={(e) => handleModeSelect(e)}
                        name="mode" id="mode-select">
                    <option id="no-selection" value="">Transaction</option>
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

            </form>
        </React.Fragment>
    );
};
// ========================================

ReactDOM.render(<Account/>, document.getElementById('root'));

