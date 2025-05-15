# Reproduction repo for issue [#72](https://github.com/h3js/srvx/issues/72) with srvx

## Run the reproduction

```sh
# Install deps
deno install

# bundle the server
deno run --allow-env --allow-read --allow-run ./bundle.ts

# run the server
deno run --allow-env --allow-net out/main.js
```

This gives us broken headers. Notice how content-type seems to be broken into `c` and `t`.

```sh
finxol ~ » curl -v http://localhost:1993/
* Host localhost:1993 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:1993...
* connect to ::1 port 1993 from ::1 port 57464 failed: Connection refused
*   Trying 127.0.0.1:1993...
* Connected to localhost (127.0.0.1) port 1993
> GET / HTTP/1.1
> Host: localhost:1993
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< c: o
< t: e
< vary: Accept-Encoding
< transfer-encoding: chunked
< date: Thu, 15 May 2025 18:29:27 GMT
<
* Connection #0 to host localhost left intact
👋 Hello there!%
```


## Run without bundling

The bug isn't present when the server isn't bundled first

```sh
# Run directly
deno run --allow-env --allow-net main.ts
```

This gives us normal headers:

```sh
finxol ~ » curl -v http://localhost:1993/
* Host localhost:1993 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:1993...
* connect to ::1 port 1993 from ::1 port 57433 failed: Connection refused
*   Trying 127.0.0.1:1993...
* Connected to localhost (127.0.0.1) port 1993
> GET / HTTP/1.1
> Host: localhost:1993
> User-Agent: curl/8.7.1
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< content-type: text/plain;charset=UTF-8
< vary: Accept-Encoding
< content-length: 17
< date: Thu, 15 May 2025 18:26:03 GMT
<
* Connection #0 to host localhost left intact
👋 Hello there!%
```
