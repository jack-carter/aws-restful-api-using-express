# restful-api-using-express
This illustrates a set of conventions that are useful in:
* defining complete RESTful APIs following the principles of [RESTful Resource Design](#restful-resource-design)
* creating a wrapper Lambda to house the API written in Express
* supporting validation schemas for all API operations

## RESTful Resource Design
This is a design approach where:
* an _Entity_ is some form of information we wish to maintain, typically in a persistent data store
* a _Resource_ represents a way to manipulate a specific _Entity_ in our system using only HTTP methods
* the HTTP methods of POST, GET, PUT, PATCH, DELETE are used to invoke C.R.U.D. operations in the data store
* [standard HTTP Status Codes](#standard-http-status-codes) are used to indicate the end result of the request

## Standard HTTP Status Codes
These conventions adhere to the definitions of HTTP Status Codes as described [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

We find the following list of HTTP Status Codes to be particularly useful when creating a new RESTful API:
* [200 OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) for generally successful responses
* [201 Created](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201) in response to a successful POST request
* [204 No Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204) when a Resource exists, but there’s no information to return
* [400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) when the requestor has not provided the correct information
* [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) has not provided a suitable Authorization token
* [403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403) when the requestor’s Authorization token has been denied
* [404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) when the requested collection or singular item isn’t there
* [405 Method Not Allowed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) when the Resource doesn’t allow that HTTP method
* [406 Not Acceptable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406) when the requestor has asked for an unsupported Content-Type
* [409 Conflict](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409) when a PUT request fails due to outdated data being passed
* [415 Unsupported Media Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415) when the requestor has passed an unsupported Content-Type
* [500 Internal Server Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) the server has suffered an unrecoverable error
* [503 Service Unavailable](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) during maintenance periods when the service is offline

## Idempotent Operations
In the world of HTTP there is an architectural quality known as "idempotent", which means the same operation with the exact same parameters can be requested many times, and yet the end state of the system will be the same after all of those attempts.

All of the HTTP methods are by definition supposed to be idempotent, save one -- POST.

It is the expectation of the POST method to create things that did not exist before, and for that reason it cannot be idempotent, because it's supposed to alter the system state by creating an _Entity_ that didn't exist before.

All other HTTP methods, however, are intended to be idempotent, so for the API developer this is important to keep in-mind, so that your implementation adheres to this expectation, without inadvertently muddling the system state somewhere along the way.

(and "Yes", this means I could DELETE the same _Resource_ over and over again, and SHOULD get the exact same result and the exact same system end state).

## POST vs PUT
The designers of HTTP provided two different means to create entities through RESTful _Resources_ -- the POST and the PUT.

However, there are distinctive differences between them, and in fact each has a dinstinct purpose, aside from creating a new _Resource_ through HTTP methods.

The key difference between these two HTTP methods has to do with "who gets to name the new _Resource_?".

The architectural guideline that has served best to answer this across the years is this:
* IF you need the underlying system to ensure distinctive identity of new _Resources_, then use POST
* IF you wish to allow callers to ensure distinctive identity of new _Resources_, then use PUT

It's quite that simple.

## PUT vs PATCH
Both of these HTTP methods are intended to update the information of a _Resource_, but their intentions are quite distinctive even still.

| HTTP Method | Description                                                                         |
| :-:         | :--                                                                                 |
| PUT         | _replace_ an item with the given ID, in its entirety or if non-existent _create_ it |
| PATCH       | _modify_ ONLY the properties passed in the request                                  |

Quite often APIs will NOT adhere to this distinction and will instead treat PUT like a PATCH, although this is NOT aligned with the intention of PUT -- PUT is intended to _replace_ a _Resource_, NOT simply update it, so be clear in your API by selecting the most appropriate HTTP method.

You MAY even implement BOTH, so that updates can use PATCH and replacements can use PUT.

Only you can decide.
