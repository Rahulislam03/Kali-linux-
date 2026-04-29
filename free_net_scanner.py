import socket
import time
import sys

def print_slow(text):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(0.03)
    print()

def scan_host(host):
    print_slow(f"\n[!] Initializing Free Net Scanner...")
    print_slow(f"[!] Target Host: {host}")
    print_slow("[!] Scanning common free-net ports (80, 443, 8080, 3128)...")
    
    ports = [80, 443, 8080, 3128]
    found_ports = []

    for port in ports:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(2)
        result = s.connect_ex((host, port))
        if result == 0:
            print(f"[+] PORT {port}: OPEN (Potential Bug Found)")
            found_ports.append(port)
        else:
            print(f"[-] PORT {port}: CLOSED")
        s.close()

    if found_ports:
        print_slow("\n[SUCCESS] Vulnerable ports found! You can use these for tunneling.")
        print_slow(f"Suggested Method: SNI / HTTP Payload on Port {found_ports[0]}")
    else:
        print_slow("\n[FAILED] No open ports found. Try another host or SNI.")

if __name__ == "__main__":
    print("====================================")
    print("      FREE-NET HOST SCANNER v1.0    ")
    print("====================================")
    
    # উদাহরণ হিসেবে একটি ফ্রি-লিঙ্ক হোস্ট
    target_host = input("Enter Host/SNI Bug (e.g. m.facebook.com): ")
    if not target_host:
        target_host = "m.facebook.com"
        
    scan_host(target_host)
          
