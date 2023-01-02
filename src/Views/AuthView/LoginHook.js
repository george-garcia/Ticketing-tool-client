import {useLoginUserMutation} from "../../store";
const LoginHook = ({email, password}) => {

    const {isLoading, error, data} = useLoginUserMutation({email, password})
    if(isLoading)
        console.log('loading');
    else if(error)
        console.log('error');
    else if(data)
        return console.log('success', data);

    return (
        <>
            <div><h2>Success</h2></div>
        </>
    );
}

export default LoginHook;