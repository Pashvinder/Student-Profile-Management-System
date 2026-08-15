# SPMS Student Management Page

## Files

Place the files in your existing project like this:

```text
your-project/
│
├── pages/
│   └── manage.html
│
├── style/
│   ├── style.css          <-- your existing common CSS
│   └── manage.css         <-- this page's CSS
│
├── scripts/
│   └── manage.js          <-- this page's JS
│
└── files/
    └── assets/
        └── ...            <-- your existing assets
```

The HTML follows the same relative-path pattern as the supplied index/signup pages:
- `../style/style.css`
- `../style/manage.css`
- `../scripts/manage.js`
- `../files/assets/logo.png`

Your supplied project already uses `currentUser` for the logged-in user and stores registered accounts in `users`. This page reads `currentUser` and checks `currentUser.role`.

## Student storage

Students are stored permanently in:

```js
localStorage.getItem("students")
```

The value is an array of student objects.

Example:

```js
[
    {
        id: "123456789",
        name: "Arjun Mehta",
        rollNo: "22CS001",
        branch: "CSE",
        cgpa: "9.12"
    }
]
```

## Admin

If the current user has:

```js
role: "Admin"
```

the Add, Edit and Remove controls are available.

For non-admin users, the student directory remains visible, but management controls are hidden and an access message is shown.

## OTP

There is no backend yet.

When an admin edits or removes students, the page generates a six-digit OTP using:

```js
Math.floor(100000 + Math.random() * 900000)
```

The OTP is printed in the browser console.

Open:

```text
F12 -> Console
```

Enter the printed OTP into the verification box.

## Important

This is intentionally a beginner-friendly frontend-only implementation.

The OTP is NOT secure because it exists in browser JavaScript/localStorage. Real authentication and OTP verification must be moved to a backend later.

## Adding the page to navigation

Add your own link wherever your existing navigation points to the Manage page:

```html
<a href="manage.html">Manage</a>
```

If your page folder has a different name, keep the relative paths in `manage.html` correct.
