from random import randint

for i in range(0, 10):
    with open(f"graphs/graph{i}.txt", "w") as f:
        n = 30
        m = n*n/10
        f.write(f"{n}\n")
        edges = set()
        while m > 0:
            u = randint(0, n-1)
            v = randint(0, n-1)
            if u == v or (u,v) in edges or (v,u) in edges:
                continue
            f.write(f"{u} {v}\n")
            edges.add((u,v))
            m-=1