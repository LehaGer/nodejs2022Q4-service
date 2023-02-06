# Home Library Service

## Description

Here `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!
- [task requirements](https://github.com/AlreadyBored/nodejs-assignments/edit/main/assignments/rest-service/assignment.md)
- [task score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/score.md)

## Installation guide

```
git clone https://github.com/LehaGer/nodejs2022Q4-service.git
```

```
npm checkout develop
```
```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
## End-points description

1. For `Users`, `Artists`, `Albums`, `Tracks` and `Favorites` REST endpoints with separate router paths created
* `Users` (`/user` route)
    * `GET /user` - get all users
        - Server answers with `status code` **200** and all users records
    * `GET /user/:id` - get single user by id
        - Server answers with `status code` **200** and record with `id === userId` if it exists
        - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    * `POST /user` - creates user (following DTO)
      `CreateUserDto`
      ```typescript
          interface CreateUserDto {
            login: string;
            password: string;
          }
      ```
        - Server answers with `status code` **201** and newly created record if request is valid
        - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /user/:id` - update user's password
      `UpdatePasswordDto` (with attributes):
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string; // previous password
        newPassword: string; // new password
      }
      ```
        - Server answers with` status code` **200** and updates record if request is valid
        - Server answers with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answers with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
        - Server answers with` status code` **403** and corresponding message if `oldPassword` is wrong
    * `DELETE /user/:id` - delete user
        - Server answers with `status code` **204** if the record is found and deleted
        - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

* `Tracks` (`/track` route)
    * `GET /track` - get all tracks
        - Server answers with `status code` **200** and all tracks records
    * `GET /track/:id` - get single track by id
        - Server answers with `status code` **200** and record with `id === trackId` if it exists
        - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    * `POST /track` - create new track
        - Server answers with `status code` **201** and newly created record if request is valid
        - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /track/:id` - update track info
        - Server answers with` status code` **200** and updats record if request is valid
        - Server answers with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
        - Server answers with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    * `DELETE /track/:id` - delete track
        - Server answers with `status code` **204** if the record is found and deleted
        - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

* `Artists` (`/artist` route)
    * `GET /artist` - get all artists
        - Server answers with `status code` **200** and all artists records
    * `GET /artist/:id` - get single artist by id
        - Server answers with `status code` **200** and record with `id === artistId` if it exists
        - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    * `POST /artist` - create new artist
        - Server answers with `status code` **201** and newly created record if request is valid
        - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /artist/:id` - update artist info
        - Server answers with` status code` **200** and updates record if request is valid
        - Server answers with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
        - Server answers with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    * `DELETE /artist/:id` - delete album
        - Server answers with `status code` **204** if the record is found and deleted
        - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

* `Albums` (`/album` route)
    * `GET /album` - get all albums
        - Server answers with `status code` **200** and all albums records
    * `GET /album/:id` - get single album by id
        - Server answers with `status code` **200** and record with `id === albumId` if it exists
        - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    * `POST /album` - create new album
        - Server answers with `status code` **201** and newly created record if request is valid
        - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /album/:id` - update album info
        - Server answers with` status code` **200** and updates record if request is valid
        - Server answers with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
        - Server answers with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    * `DELETE /album/:id` - delete album
        - Server answers with `status code` **204** if the record is found and deleted
        - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

* `Favorites`
    * `GET /favs` - get all favorites
        - Server answers with `status code` **200** and all favorite records (**not their ids**), split by entity type:
      ```typescript
      interface FavoritesRepsonse{
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
    * `POST /favs/track/:id` - add track to the favorites
        - Server answers with `status code` **201** and corresponding message if track with `id === trackId` exists
        - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
        - Server answers with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
    * `DELETE /favs/track/:id` - delete track from favorites
        - Server answers with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
        - Server answers with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if corresponding track is not favorite
    * `POST /favs/album/:id` - add album to the favorites
        - Server answers with `status code` **201** and corresponding message if album with `id === albumId` exists
        - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
        - Server answers with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
    * `DELETE /favs/album/:id` - delete album from favorites
        - Server answers with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
        - Server answers with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if corresponding album is not favorite
    * `POST /favs/artist/:id` - add artist to the favorites
        - Server answers with `status code` **201** and corresponding message if artist with `id === artistId` exists
        - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
        - Server answers with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
    * `DELETE /favs/artist/:id` - delete artist from favorites
        - Server answers with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
        - Server answers with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
        - Server answers with `status code` **404** and corresponding message if corresponding artist is not favorite

2. An `application/json` format is used for request and response body.

3. `User`'s password is excluded from server response.

4. When you delete `Artist`, `Album` or `Track`, it's `id` will be deleted from favorites (if was there) and references to it in other entities become `null`. For example: `Artist` is deleted => this `artistId` in corresponding `Albums`'s and `Track`'s become `null` + this artist's `id` is deleted from favorites, same logic for `Album` and `Track`.

5. Non-existing entity can't be added to `Favorites`.

6. Service listen on PORT `4000` by default, PORT value is stored in `.env` file.

7. Incoming requests are validated.