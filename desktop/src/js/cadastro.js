const Cadastro = {
    addPhoneField: function() {
        const phoneInputsContainer = document.querySelector('.phone-inputs');
        const newPhoneInput = document.createElement('div');
        newPhoneInput.classList.add('phone-input');
        newPhoneInput.innerHTML = `
            <label for="telefone">Telefone:</label>
            <input type="tel" name="telefone[]" pattern="[0-9]{2} [0-9]{5}-[0-9]{4}" placeholder="99 99999-9999" required>
        `;
        phoneInputsContainer.appendChild(newPhoneInput);
    }
};

// Tornar o objeto Cadastro acessível globalmente
window.Cadastro = Cadastro;
