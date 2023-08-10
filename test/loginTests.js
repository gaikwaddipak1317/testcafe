import { Selector } from 'testcafe';

fixture`SDLMS Login Tests`
    .page`https://beta.deepthought.education/login`;

// Test 1: Successful login with valid credentials
test('Successful login with valid credentials', async t => {
    await t
        .typeText('#username', 'Username')
        .typeText('#password', 'Password@123')
        .click("#login")
        .expect(Selector('.sr-only').exists).ok(); // Assuming ".dashboard" is a class on the dashboard screen
});

// Test 2: Unsuccessful login attempts with invalid credentials
test('Unsuccessful login attempts with invalid credentials', async t => {
    await t
        .typeText('#username', 'invalid_email@example.com')
        .typeText('#password', 'invalid_password')
        .click('#login')
        .expect(Selector('.alert.alert-danger').exists).ok();
        });

// // Test 3: Validate error messages for invalid login attempts
test('Validate error messages for invalid login attempts', async t => {
    await t
        .typeText('#username', 'user123')
        .typeText('#password', "Password")
        .click('#login')
        .expect(Selector('#login-error-notify').innerText).contains('×\nLogin Unsuccessful\n\nInvalid login credentials');
});

// // Test 4: Validate successful login redirection
test('Validate successful login redirection', async t => {
    await t
        .typeText('#username', 'Username')
        .typeText('#password', 'Password@123')
        .click('#login')
        .expect(Selector('.sr-only').exists).ok()
        .expect(Selector('.sr-only').innerText).eql("Home");
});
