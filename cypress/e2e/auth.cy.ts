describe('Auth', () => {
	it('Authorize with right code', () => {
		cy.visit('/');

		cy.get('input').focus().type('999999999');
		cy.contains('Продолжить').click();
		cy.get('input[placeholder="Проверочный код"]').focus().type('000000');
		cy.get('.button').contains('Войти').click();
		cy.fixture('signIn/signInSuccess').then((json) => {
			cy.intercept('POST', 'https://shift-backend.onrender.com/users/signin', json);
		});
		cy.contains('Выйти').should('exist');
	});

	it('Authorize with wrong code', () => {
		cy.visit('/');

		cy.get('input').focus().type('999999999');
		cy.contains('Продолжить').click();
		cy.get('input[placeholder="Проверочный код"]').focus().type('000001');
		cy.get('.button').contains('Войти').click();
		cy.fixture('signIn/signInError').then((json) => {
			cy.intercept('POST', 'https://shift-backend.onrender.com/users/signin', { statusCode: 400 });
		});
		cy.contains('Неверный код').should('exist');
		cy.contains('Выйти').should('not.exist');
	});
});
