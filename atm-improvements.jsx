const ATMDeposit = ({onChange, isDeposit, isValid}) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
        <React.Fragment>

            <h3><i className="fas fa-money-bill-wave"></i> {choice[Number(!isDeposit)]}</h3>
            <input id="number-input" type="number" width="200" step="20" min="0" max="1000" onChange={onChange}
                   onKeyPress={preventMe} onPaste={preventMe}/>
            <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"/>
        </React.Fragment>
    )
        ;
};

const preventMe = (e) => {
    e.preventDefault();
};

// const QuickCash = () => {
//
//     return (
//         <>
//             <button style={{position: "absolute", left: "42px", top: "291px"}}
//                     onClick={()=>alert('clicked')}
//             >20
//             </button>
//             <button style={{position: "absolute", left: "42px", top: "331px"}}>40</button>
//         </>
//
//     );
// };


const Account = () => {
    // let deposit = 0; // state of this transaction
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(2700);
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
        <React.Fragment>
            <button
                style={{left: "35px", top: "294px"}}
                onClick={()=>  totalState>=20 ? setTotalState(totalState - 20) : ''}
            >20
            </button>
            <button
                style={{left: "35px", top: "334px"}}
                onClick={()=>  totalState>=40 ? setTotalState(totalState - 40) : ''}
            >40
            </button>
            <button
                style={{left: "35px", top: "375px"}}
                onClick={()=>  totalState>=60 ? setTotalState(totalState - 60) : ''}
            >60
            </button>
            <button
                style={{left: "35px", top: "415px"}}
                onClick={()=>  totalState>=80 ? setTotalState(totalState - 80) : ''}
            >80
            </button>
            <button
                style={{left: "468px", top: "294px"}}
                onClick={()=>  totalState>=100 ? setTotalState(totalState - 100) : ''}
            >100
            </button>
            <button
                style={{left: "468px", top: "334px"}}
                onClick={()=>  totalState>=200 ? setTotalState(totalState - 200) : ''}
            >200
            </button>
            <button
                style={{left: "468px", top: "376px"}}
                onClick={()=>  totalState>=500 ? setTotalState(totalState - 500) : ''}
            >500
            </button>
            <button
                style={{left: "464px", top: "417px"}}
                onClick={()=>  totalState>=1000 ? setTotalState(totalState - 1000) : ''}
            >1000
            </button>

            <form onSubmit={handleSubmit}>

                <h3><i className="fas fa-piggy-bank fa-lg"></i> Welcome to PIGGY Bank</h3>
                <h3 id="total"><i className="fas fa-chart-bar fa-lg"></i> {status}</h3>
                <label>Select or use QuickCash Buttons</label>
                <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
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
//ReactDOM.render(<QuickCash/>, document.getElementById('qc'));
