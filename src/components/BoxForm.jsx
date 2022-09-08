import React, {useState} from "react";
import StyledBox from "./StyledBox";

const BoxForm = (props) => {
    const[state, setState] = useState({
        bgColor: '',
        width: 0,
        height: 0
    });

    const[errors, setErrors] = useState({
        bgColor: '',
        width: '',
        height: '',
        isBox: [true, '']
    });

    const[boxList, setBoxList] = useState([]);

    

    const createBox = (e) => {
        e.preventDefault();
        const newBox = {
            bgColor: e.target['color'].value,
            width: e.target['width'].value,
            height: e.target['height'].value 
        }
        setBoxList([...boxList, newBox])
    };
    
    const handleBGChanges = (e) => {
        const target = e.target.value
        setState({bgColor: target})

        if(target.length < 3){
            setErrors({bgColor: 'Must be 3 characters or more'})
        }else{
            setErrors({bgColor: ''})
        }
    };

    const handleWChanges = (e) => {
        const target = e.target.value
        setState({width: target})
        
        if(target < 50){
            setErrors({width: 'Must be at least 50px wide.'})
        }else if(target > 1000){
            setErrors({width: 'Must be under 1000px wide.'})
        }else{
            setErrors({width: ''})
        }

        if(state.width !== state.height){
            setErrors({isBox: [false, 'This is not a box']})
        }else{
            setErrors({isBox: [true, '']})
        }
    };

    const handleHChanges = (e) => {
        const target = e.target.value
        setState({height: target})

        if(target < 50){
            setErrors({height: 'Must be at least 50px high.'})
        }else if(target > 1000){
            setErrors({height: 'Must be under 1000px high.'})
        }else{
            setErrors({height: ''})
        }

        if(state.height !== state.width){
            setErrors({isBox: [false, 'This is not a box']})
        }else{
            setErrors({isBox: [true, '']})
        }
    };


    return(
        <div>
            <form onSubmit={ createBox }>
                <div>
                    <label>Color</label>
                    <input type="text" onChange={handleBGChanges} value={state.bgColor} id='color'/>
                    {
                        errors.bgColor ?
                        <p style={{color:'red'}}>{ errors.bgColor }</p> :
                        ''
                    }
                </div>
                <div>
                    <label>Width</label>
                    <input type="number" onChange={handleWChanges} value={state.width} id='width'/>
                    {
                        errors.width ?
                        <p style={{color:'red'}}>{ errors.width }</p> :
                        ''
                    }
                </div>
                <div>
                    <label>Height</label>
                    <input type="number" onChange={handleHChanges} value={state.height} id='height'/>
                    {
                        errors.height ?
                        <p style={{color:'red'}}>{ errors.height }</p> :
                        ''
                    }
                </div>
                {
                        errors.isBox ?
                        <p style={{color:'red'}}>{ errors.isBox[1] }</p> :
                        ''
                    }
                <input type="submit" value="Create Box"/>
            </form>
            <StyledBox bgColor={state.bgColor || 'purple'} width={state.width} height={state.height}/>
            {boxList.map(x => {
                console.log(x.width)
                return <StyledBox bgColor={x.bgColor || 'purple'} width={x.width} height={x.height}/>
            })}
        </div>
    );
};

export default BoxForm;