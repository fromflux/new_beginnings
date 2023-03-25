# GRAIL Take Home Assignment
A tech challenge in the form of a simple api service

## Getting Started

First, install node dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Available end point:

```GET localhost:3000/participants```

```GET localhost:3000/participants/:REFERENCE```

```PUT localhost:3000/participants/:REFERENCE``` with updated valid entry partial as json body

```POST localhost:3000/participants/:REFERENCE``` with new full valid entry (omit reference) as json body

Example entry:

```json
{
	"reference": "KFG-737", // auto-generated; required
	"name": "Anew Name", // string; required
	"dateOfBirth": "2023-03-24T21:29:00.362Z", // ISO Date string; required
	"email": "kate.smith@mail.com", // email string; required
	"phoneNumber": "07473373737", // string min length 10; required
	"address": "home address" // string; required
}
```

To run the tests:

```bash
npm test
```

