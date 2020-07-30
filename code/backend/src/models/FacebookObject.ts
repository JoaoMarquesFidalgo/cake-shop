interface Name {
    familyName: string;
    givenName: string;
}

export class FacebookObject {
    public id: string;

    public emails: { value: string }[]

    public name: Name;

    public facebookId: string;
}
