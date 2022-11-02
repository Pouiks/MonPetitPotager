import getLoginToken from '../src/Services/login';
import getAuth from '../src/Services/getAuth';


describe("Try to login",  () => {
    it("calls login function and return objects", async () => {
        const token = await getLoginToken("test@test.com", "test");
        const user = await getAuth(token.data.token);
        expect(user.data.authData.name).toBe("test")
        expect(user.data.authData.email).toBe("test@test.com")
        expect(user.data.authData.role).toBe("user")
    })
})
