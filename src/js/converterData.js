const converterData = data => {
    return new Date(data).toLocaleDateString('pt-BR')
}

export default converterData;