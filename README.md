
# ControlMC - Minecraft Pocket Edition Control Panel

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

ControlMC is a web-based control panel for managing Minecraft Pocket Edition servers using the RCON (Remote Console) protocol. It allows you to perform various server management tasks through an easy-to-use web interface.

## Features

- Connect to your Minecraft Pocket Edition server using RCON protocol
- Execute commands directly from the control panel
- Manage players, ban/unban users
- View server logs and real-time console output
- Easy-to-use and mobile-friendly user interface

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [RCON Protocol](https://wiki.vg/RCON) - The protocol used to communicate with the Minecraft server

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kardespro/ControlMC.git
cd ControlMC
```

2. Install dependencies:

```bash
npm install
```

### Usage

1. Set up your Minecraft server with RCON enabled and get the RCON credentials (hostname, port, and RCON password).

2. Start the development server:

```bash
npm run dev
```
or 

```bash
npm run build && npm run start
```

4. Open your browser and go to `http://localhost:3000` to access the ControlMC control panel.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.