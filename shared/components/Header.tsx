import { NavLink } from 'react-router';
import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '../components/ui/resizable-navbar';
import { useState } from 'react';

export default function Header() {
    const navItems = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Playlists',
            link: '/playlists',
        },
        {
            name: 'Contact',
            link: '/contact',
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="secondary">Login</NavbarButton>
                        <NavbarButton variant="primary" className="text-lg font-semibold" as={NavLink} to='/oauth'>
                            Sign up
                        </NavbarButton>
                    </div>
                </NavBody>

                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        {navItems.map((item, idx) => (
                            <NavLink key={`mobile-link-${idx}`} to={item.link} onClick={() => setIsMobileMenuOpen(false)} className="relative text-white dark:text-white! text-xl">
                                {item.name}
                            </NavLink>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-full">
                                Login
                            </NavbarButton>
                            <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-full">
                                Book a call
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
