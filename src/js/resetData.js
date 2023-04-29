const resetData = (newThis) => {
    Object.assign(newThis.$data, newThis.$options.data())
}

export default resetData;