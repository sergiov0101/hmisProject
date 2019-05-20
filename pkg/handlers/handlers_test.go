package handlers

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestInvalidPassword(t *testing.T) {
	require.False(t, checkValidPassword("contraseñacorta"))
}

func TestValidPassword(t *testing.T) {
	require.True(t, checkValidPassword("aaaOOO999"))
}

func TestInvalidGuid(t *testing.T) {
	require.True(t, checkValidGuidRegExp("0aff653d-fc8c-4140-be25-4ff7a8de12b9a"))
}

func TestValidGuid(t *testing.T) {
	require.True(t, checkValidGuidRegExp("0aff653d-fc8c-4140-be25-4ff7a8de12b9"))
}
