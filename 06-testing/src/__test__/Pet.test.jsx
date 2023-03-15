import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("displays a default thumbnail", async () => {
    const pet = render(
        <StaticRouter>
            <Pet></Pet>
        </StaticRouter>
    );
    const petThumbnail = await pet.findByTestId("thumbnail");
    expect(petThumbnail.src).toContain("none.jpg");
    pet.unmount();
});

test("displays a none default thumbnail", async () => {
    const pet = render(
        <StaticRouter>
            <Pet images={["1.jpg", "2.jpg", "3.jpg"]}></Pet>
        </StaticRouter>
    );
    const petThumbnail = await pet.findByTestId("thumbnail");
    expect(petThumbnail.src).toContain("1.jpg");
    pet.unmount();
});
