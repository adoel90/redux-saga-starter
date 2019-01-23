const logMiddlware = ({ dispatch, getState }) => (next) => (action) => {

    console.log(`What happened : ${action.type}`)
    next(action)
}

export default logMiddlware;