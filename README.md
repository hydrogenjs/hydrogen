cli
===

The world&#39;s lightest static-site generator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cli.svg)](https://npmjs.org/package/cli)
[![Downloads/week](https://img.shields.io/npm/dw/cli.svg)](https://npmjs.org/package/cli)
[![License](https://img.shields.io/npm/l/cli.svg)](https://github.com/ShailenNaidoo/hydrogen/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hydrogen-cli
$ hydrogen COMMAND
running command...
$ hydrogen (-v|--version|version)
hydrogen-cli/0.0.2 linux-x64 node-v10.16.0
$ hydrogen --help [COMMAND]
USAGE
  $ hydrogen COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g cli
$ hydrogen COMMAND
running command...
$ hydrogen (-v|--version|version)
cli/1.0.0 linux-x64 node-v10.16.0
$ hydrogen --help [COMMAND]
USAGE
  $ hydrogen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hydrogen build`](#hydrogen-build)
* [`hydrogen dev`](#hydrogen-dev)
* [`hydrogen help [COMMAND]`](#hydrogen-help-command)

## `hydrogen build`

Starts building templates for production

```
USAGE
  $ hydrogen build
```

_See code: [src/commands/build.ts](https://github.com/ShailenNaidoo/hydrogen/blob/v0.0.2/src/commands/build.ts)_

## `hydrogen dev`

Start Hydrogen dev server

```
USAGE
  $ hydrogen dev
```

_See code: [src/commands/dev.ts](https://github.com/ShailenNaidoo/hydrogen/blob/v0.0.2/src/commands/dev.ts)_

## `hydrogen help [COMMAND]`

display help for hydrogen

```
USAGE
  $ hydrogen help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`hydrogen hello [FILE]`](#hydrogen-hello-file)
* [`hydrogen help [COMMAND]`](#hydrogen-help-command)

## `hydrogen hello [FILE]`

describe the command here

```
USAGE
  $ hydrogen hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ hydrogen hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/ShailenNaidoo/hydrogen/blob/v1.0.0/src/commands/hello.ts)_

## `hydrogen help [COMMAND]`

display help for hydrogen

```
USAGE
  $ hydrogen help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_
<!-- commandsstop -->
